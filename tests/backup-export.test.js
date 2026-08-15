const test = require("node:test");
const assert = require("node:assert/strict");
const { Writable } = require("node:stream");

const Patient = require("../dist/modules/patients/patient.model.js");
const Appointment = require("../dist/modules/appointments/appointment.model.js");
const Bill = require("../dist/modules/billing/billing.model.js");
const { exportBackup } = require("../dist/modules/backup/backup.controller.js");

class MockRes extends Writable {
  constructor() {
    super();
    this.headers = {};
    this.statusCode = 200;
    this.body = Buffer.alloc(0);
  }

  setHeader(name, value) {
    this.headers[name] = value;
    return this;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(payload) {
    this.body = Buffer.from(JSON.stringify(payload));
    return this;
  }

  send(payload) {
    this.body = Buffer.isBuffer(payload)
      ? payload
      : Buffer.from(payload);
    return this;
  }

  _write(chunk, encoding, callback) {
    this.body = Buffer.concat([
      this.body,
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk),
    ]);
    callback();
  }
}

test("exportBackup creates a valid zip archive", async () => {
  Patient.find = async () => [{ _id: "patient-1" }];
  Appointment.find = async () => [{ _id: "appointment-1" }];
  Bill.find = async () => [{ _id: "bill-1" }];

  const req = {
    user: { userId: "user-123" },
  };

  const res = new MockRes();

  await exportBackup(req, res);

  assert.equal(res.statusCode, 200);
  assert.match(res.headers["Content-Type"], /application\/zip|application\/x-zip-compressed/);
  assert.match(res.headers["Content-Disposition"], /clinic-backup-.*\.zip/i);
  assert.ok(res.body.length > 0, "ZIP archive should not be empty");
  assert.equal(res.body.subarray(0, 4).toString("ascii"), "PK\u0003\u0004");
});

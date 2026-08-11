import Patient from "../patients/patient.model";
import Appointment from "../appointments/appointment.model";
import Bill from "../billing/billing.model";

export const getDashboard = async () => {
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const [
        totalPatients,
        todayAppointmentsCount,
        totalRevenueAgg,
        todayAppointments,
        recentPatients,
        todayRevenueAgg,
        pendingPaymentsAgg,
        completedBills,
        monthRevenueAgg,
    ] = await Promise.all([
        Patient.countDocuments(),

        Appointment.countDocuments({
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }),

        Bill.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$paid",
                    },
                },
            },
        ]),

        Appointment.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        })
            .populate("patientId", "name")
            .sort({ time: 1 })
            .limit(10),

        Patient.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name"),

        Bill.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfDay,
                        $lte: endOfDay,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$paid",
                    },
                },
            },
        ]),

        Bill.aggregate([
            {
                $project: {
                    pending: {
                        $subtract: [
                            "$amount",
                            "$paid",
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$pending",
                    },
                },
            },
        ]),

        Bill.countDocuments({
            status: "Paid",
        }),

        Bill.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfMonth,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$paid",
                    },
                },
            },
        ]),
    ]);

    return {
        stats: {
            totalPatients,

            todayAppointments:
                todayAppointmentsCount,

            totalRevenue:
                totalRevenueAgg[0]?.total ??
                0,
        },

        todayAppointments:
            todayAppointments.map(
                (appointment: any) => ({
                    _id: appointment._id,
                    patientName:
                        appointment.patientId
                            ?.name ?? "Unknown",
                    purpose:
                        appointment.purpose,
                    time: appointment.time,
                })
            ),

        recentPatients:
            recentPatients.map((patient) => ({
                _id: patient._id,
                name: patient.name,
            })),

        revenue: {
            today:
                todayRevenueAgg[0]?.total ??
                0,

            pending:
                pendingPaymentsAgg[0]
                    ?.total ?? 0,

            completedBills,

            month:
                monthRevenueAgg[0]?.total ??
                0,
        },
    };
};
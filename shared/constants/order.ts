export interface IOrderTracking {
    id: string;
    number: string;
    status: "order_placed" | "order_picked_up" | "order_in_transit" | "order_out_for_delivery" | "order_delivered" | "order_cancelled";
    expectedDeliveryDate: Date;
    shipment: {
        from: string;
        to: string;
        weight: string;
        vehicleType: string;
        timeline: {
            status: "order_placed" | "order_picked_up" | "order_in_transit" | "order_out_for_delivery" | "order_delivered" | "order_cancelled";
            date: Date;
            location: string
        }[];
    },
    driver: {
        name: string;
        phone: string;
    }
}

export const orders: IOrderTracking[] = [
    {
        id: "1",
        number: "1234567890",
        status: "order_placed",
        expectedDeliveryDate: new Date("2026-01-01"),
        shipment: {
            from: "Cairo",
            to: "Alexandria",
            weight: "100kg",
            vehicleType: "Car",
            timeline: [{
                status: "order_placed",
                date: new Date("2026-01-01"),
                location: "Cairo"
            }]
        },
        driver: {
            name: "John Doe",
            phone: "1234567890"
        }
    },
    {
        id: "2",
        number: "1234567891",
        status: "order_picked_up",
        expectedDeliveryDate: new Date("2026-01-01"),
        shipment: {
            from: "Cairo",
            to: "Alexandria",
            weight: "100kg",
            vehicleType: "Car",
            timeline: [{
                status: "order_picked_up",
                date: new Date("2026-01-01"),
                location: "Cairo"
            }, {
                status: "order_in_transit",
                date: new Date("2026-01-01"),
                location: "Cairo"
            }, {
                status: "order_out_for_delivery",
                date: new Date("2026-01-01"),
                location: "Cairo"
            }, {
                status: "order_delivered",
                date: new Date("2026-01-01"),
                location: "Cairo"
            }]
        },
        driver: {
            name: "John Doe",
            phone: "1234567890"
        }
    }
]
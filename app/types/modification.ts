import {ComplectationType} from "~/app/types/complectation";

export type ModificationType = {
    id: number
    title: string
    gearbox: {
        name: string
        title: string
    }
    drive_type: {
        name: string
        title: string
    }
    engine_type: {
        name: string
        title: string
    }
    engine_power: number,
    engine_volume: number | null,
    engine_power_kvt: number | null,
    tech_params: {
        title: string
        value: string
    }[]
    complectations: ComplectationType[]
}
export class Sensor {
    name: string;
    type: number;
    pin: number;
}

export class ReadData {
    humidity: number;
    temperature: number;
    isValid: boolean;
    errors: number;
}

export class SensorReadData {
    sensor: Sensor;
    readData: ReadData;
}
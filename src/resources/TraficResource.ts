import { TraficData } from '../types/types';
export class TraficResource {
    static toJsonDetails(data: TraficData) {
        return {
            distance: data.routes[0].legs[0].distance,
            duration: data.routes[0].legs[0].duration,
            duration_in_traffic: data.routes[0].legs[0].duration_in_traffic,
        }
    }
}
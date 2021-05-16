import { BroadcasterResult } from "typeorm/subscriber/BroadcasterResult"

export class StatusResponse {

    typeResponseByStatus(status: number, data: Object): Object {
        let result = {};
        if (status !== 200 && status !== 201) {
			result = { error: data }
		} else {
			result = { data: data }
        }
        return result;
    }
}
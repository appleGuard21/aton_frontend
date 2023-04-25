import {IUser} from "./IUser";

export interface ITableDataResponse {
   page: number,
   per_page: number,
   total: number,
   total_pages: number,
   data: IUser[]
}


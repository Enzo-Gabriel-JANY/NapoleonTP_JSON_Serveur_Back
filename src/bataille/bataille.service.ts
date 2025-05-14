import { Injectable } from '@nestjs/common';

import { map, firstValueFrom } from 'rxjs';
import {Bataille} from "./Bataille";
import {HttpService} from "@nestjs/axios";


@Injectable()
export class BatailleService {
    private readonly baseUrl = 'http://localhost:5000/bataille';

    constructor(private readonly http: HttpService) {}

    async findAll(): Promise<Bataille[]> {
        const response = this.http.get(this.baseUrl).pipe(map(res => res.data));
        return await firstValueFrom(response);
    }

    async findOne(id: number): Promise<Bataille> {
        const response = this.http.get(`${this.baseUrl}/${id}`).pipe(map(res => res.data));
        return await firstValueFrom(response);
    }

    async create(bataille: Bataille): Promise<void> {

        await firstValueFrom(this.http.post(this.baseUrl, bataille));
    }

    async delete(id: number | string) {
        const url = `http://localhost:5000/bataille/${id.toString()}`;  // Convertir l'ID en chaîne
        console.log('Suppression demandée pour ID :', id);
        try {
            await this.http.delete(url).toPromise();
            return { message: `Bataille ${id} supprimée.` };
        } catch (error) {
            if (error.response?.status === 404) {
                return { message: `Bataille ${id} inexistante.` };
            }
            throw error;
        }
    }
    async update(bataille: Bataille): Promise<void> {
        try {
            console.log(bataille);
            await firstValueFrom(this.http.put(`${this.baseUrl}/${bataille.id.toString()}`, bataille));
        } catch (error) {
            throw error;
        }
    }
}
import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxDate,
    MinDate, MinLength,
    ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

export class Description {
    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'la date et le lieu doivent faire au moins 1à caractéres' })
    dateLieu: string;

    @IsString()
    @IsNotEmpty()
    forcePresentes: string;

    @IsString()
    @IsNotEmpty()
    pertes: string
    @IsString()
    @IsNotEmpty()
    situationGenerale: string;

    constructor(
        dateLieu: string,
        forcePresentes: string,
        situationGenerale: string ,
        pertes  : string
    ) {
        this.dateLieu = dateLieu;
        this.forcePresentes = forcePresentes;
        this.situationGenerale = situationGenerale;
        this.pertes = pertes ;
    }
}

export class Bataille {

    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    lieu: string;

    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsDate()
    @Type(() => Date)
    @MinDate(new Date('1769-01-01'))
    @MaxDate(new Date('1821-05-05'))
    @IsNotEmpty()
    date: Date;

    @IsBoolean()
    @IsNotEmpty()
    victoire: boolean;

    @IsString()
    @IsNotEmpty()
    img: string;

    @ValidateNested()
    @Type(() => Description)
    @IsNotEmpty()
    description: Description;

    constructor(
        id: string,
        lieu: string,
        nom: string,
        date: Date,
        victoire: boolean,
        img: string,
        description: Description
    ) {
        this.id = id;
        this.lieu = lieu;
        this.nom = nom;
        this.date = date;
        this.victoire = victoire;
        this.img = img;
        this.description = description;
    }
}

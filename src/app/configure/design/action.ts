"use client";

import prismadb from "@/lib/prismadb";
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client";

export type SaveConfigProps =  {
    color: CaseColor;
    finish: CaseFinish;
    material: CaseMaterial;
    model: PhoneModel;
    configId: string;
}

export async function saveConfig({color, finish, material, model, configId}:SaveConfigProps) {
    
    await prismadb.configuration.update({
        where: { id: configId },
        data: { color, finish, model, material }
    });


}   
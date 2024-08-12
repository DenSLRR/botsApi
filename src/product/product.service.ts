import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {CreateProductDto, UpdateProductDto} from "./dto/product.dto";
import path from "node:path";
import fs from "node:fs";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.product.findMany();

    }

     async create(dto: CreateProductDto) {
        return this.prisma.product.create({
            data: dto,
        })
    }


    async getById(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: +id },
        });
        if (!product) throw new NotFoundException('Product not found');

        return product;
    }

    async delete(id: string) {
      await this.prisma.product.delete({
            where: { id: +id },
        });
        return { message: "successfully deleted" };

    }
    async updateProduct(id: number, updateProductDto: UpdateProductDto) {
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
    }



}

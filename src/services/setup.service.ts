import type { Prisma } from "../generated/prisma/client";

import { prisma } from "../helpers/prisma";
import type {
    CreateSetupInput,
    SetupQueryInput,
    SetupStatusInput,
    UpdateSetupInput,
} from "../schemas/setup.schema";

const buildSetupWhere = (
    query: SetupQueryInput,
): Prisma.SetupWhereInput => {
    const where: Prisma.SetupWhereInput = {};

    if (query.status === "active") {
        where.isActive = true;
    }

    if (query.status === "inactive") {
        where.isActive = false;
    }

    if (query.direction !== "all") {
        where.direction = query.direction;
    }

    if (query.symbol) {
        where.symbol = {
            contains: query.symbol,
            mode: "insensitive",
        };
    }

    return where;
};

const buildSetupOrderBy = (
    query: SetupQueryInput,
): Prisma.SetupOrderByWithRelationInput => {
    switch (query.sort) {
        case "symbol":
            return {
                symbol: query.order,
            };

        case "updatedAt":
            return {
                updatedAt: query.order,
            };

        case "createdAt":
        default:
            return {
                createdAt: query.order,
            };
    }
};

export const getSetups = async (query: SetupQueryInput) => {
    const where = buildSetupWhere(query);
    const orderBy = buildSetupOrderBy(query);

    const skip = (query.page - 1) * query.limit;

    const [setups, totalItems] = await prisma.$transaction([
        prisma.setup.findMany({
            where,
            orderBy,
            skip,
            take: query.limit,
        }),

        prisma.setup.count({
            where,
        }),
    ]);

    const totalPages = Math.ceil(totalItems / query.limit);

    return {
        data: setups,

        pagination: {
            page: query.page,
            limit: query.limit,
            totalItems,
            totalPages,
            hasNextPage: query.page < totalPages,
            hasPreviousPage: query.page > 1,
        },

        filters: {
            status: query.status,
            direction: query.direction,
            symbol: query.symbol,
        },

        sorting: {
            sort: query.sort,
            order: query.order,
        },
    };
};

export const getSetupById = async (id: string) => {
    return prisma.setup.findUnique({
        where: {
            id,
        },
    });
};

export const createSetup = async (data: CreateSetupInput) => {
    return prisma.setup.create({
        data: {
            symbol: data.symbol,
            direction: data.direction,
            isActive: data.isActive,
            entries: data.entries,
            takeProfits: data.takeProfits,
            stopLoss: data.stopLoss,
            note: data.note,
        },
    });
};

export const updateSetup = async (
    id: string,
    data: UpdateSetupInput,
) => {
    return prisma.setup.update({
        where: {
            id,
        },
        data,
    });
};

export const updateSetupStatus = async (
    id: string,
    data: SetupStatusInput,
) => {
    return prisma.setup.update({
        where: {
            id,
        },
        data: {
            isActive: data.isActive,
        },
    });
};

export const deleteSetup = async (id: string) => {
    return prisma.setup.delete({
        where: {
            id,
        },
    });
};
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import {
    createSetupSchema,
    setupQuerySchema,
} from "../../../schemas/setup.schema";
import {
    createSetup,
    getSetups,
} from "../../../services/setup.service";

const getValidationErrorResponse = (error: ZodError) => {
    return NextResponse.json(
        {
            message: "Передані дані не пройшли валідацію",
            errors: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        },
        {
            status: 400,
        },
    );
};

export const GET = async (request: NextRequest) => {
    try {
        const queryParams = Object.fromEntries(
            request.nextUrl.searchParams.entries(),
        );

        const query = setupQuerySchema.parse(queryParams);
        const result = await getSetups(query);

        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            return getValidationErrorResponse(error);
        }

        console.error("Failed to get setups:", error);

        return NextResponse.json(
            {
                message: "Не вдалося отримати список сетапів",
            },
            {
                status: 500,
            },
        );
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const body: unknown = await request.json();
        const validatedData = createSetupSchema.parse(body);

        const setup = await createSetup(validatedData);

        return NextResponse.json(
            {
                message: "Сетап успішно створено",
                data: setup,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return getValidationErrorResponse(error);
        }

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                {
                    message: "Тіло запиту містить некоректний JSON",
                },
                {
                    status: 400,
                },
            );
        }

        console.error("Failed to create setup:", error);

        return NextResponse.json(
            {
                message: "Не вдалося створити сетап",
            },
            {
                status: 500,
            },
        );
    }
};
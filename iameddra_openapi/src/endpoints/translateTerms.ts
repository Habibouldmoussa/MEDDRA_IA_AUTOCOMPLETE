import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";

export class translateTerms extends OpenAPIRoute {
    schema = {
        tags: ["translate"],
        summary: "translate terms",
        request: {
            query: z.object({
                List: Str({
                    description: "List of terms to translate",

                }),
                isCompleted: Bool({
                    description: "Filter by completed flag",
                    required: false,
                }),
            }),
        },
        responses: {
            "200": {
                description: "Returns a list of tasks",
                content: {
                    "application/json": {
                        schema: z.object({
                            series: z.object({
                                success: Bool(),
                                result: z.object({
                                    tasks: Task.array(),
                                }),
                            }),
                        }),
                    },
                },
            },
        },
    };

    async handle(c) {
        // Get validated data
        const data = await this.getValidatedData<typeof this.schema>();

        // Retrieve the validated parameters
        const { page, isCompleted } = data.query;

        // Implement your own object list here

        return {
            success: true,
            tasks: [
                {
                    name: "Clean my room",
                    slug: "clean-room",
                    description: null,
                    completed: false,
                    due_date: "2025-01-05",
                },
                {
                    name: "Build something awesome with Cloudflare Workers",
                    slug: "cloudflare-workers",
                    description: "Lorem Ipsum",
                    completed: true,
                    due_date: "2022-12-24",
                },
            ],
        };
    }
}
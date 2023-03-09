import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    async findOne(ctx) {
      console.log(ctx.params, ctx.query);
      console.log(ctx.locale);

      const { id: slug } = ctx.params;
      const { query } = ctx;
      const { locale = "en" } = query;

      if (!query.filters) query.filters = {};
      query.filters.slug = { $eq: slug };
      query.filters.locale = { $eq: locale };
      const entity = await strapi.service("api::post.post").find(query);

      const { results } = await this.sanitizeOutput(entity, ctx);
      console.log(results);

      const result = results[0];

      return this.transformResponse(result);
    },
  })
);

import * as request from "../utils/request";

// Get API category
export const category = async (cateID) => {
    try {
        const res = await request.get(``, {
            params: {
                storeId: cateID,
                page: 1,
            },
        });

        return res.data.products;
    } catch (error) {
        console.log(error);
        return error;
    }
};

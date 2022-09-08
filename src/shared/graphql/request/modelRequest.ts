import { useLazyQuery } from "@apollo/client";
import { FIND_MODEL } from "../query/modelQuery";
import { Models } from "../__generate__/generated";
type Model = Pick<Models, "id" | "name">;
export const useFindCar = () => {
  const [getModels, result] = useLazyQuery<Model>(FIND_MODEL);

  const findModel = async (id: number) => {
    await getModels({
      variables: {
        where: {
          brand_id: {
            _eq: id,
          },
        },
      },
    });
  };
  return {
    findModel,
    errorRequest: result.error,
    data: result.data,
    loading: result.loading,
  };
};

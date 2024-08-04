// import { useActionState } from 'react';
import { Metadata } from "next";
import CreateForm from "../../../../components/ui/restaurants/create-form";
import { inter, poppins } from "../../../../components/fonts";
// import { createRestaurant, State } from '@/lib/actions';

export const metadata: Metadata = {
  title: "Create Restaurant",
};
export default async function CreateRestaurant({
  params,
}: {
  params: { id: string };
}) {
  // const initialState: State = {message: null} // setting up initial state
  // const createRestaurantWithUserId = createRestaurant.bind(null, params.id);
  // const [state, formAction] = useActionState(createRestaurantWithUserId, initialState);

  return (
    <main
      className={`${poppins.className} grid lg:grid-cols-2 pt-10 px-3 gap-5 pb-16`}
    >
      <section className="flex items-center justify-center text-xl">
        Register your restaurant with us
      </section>
      <section className="flex justify-center items-center w-full">
        <CreateForm userId={params.id} />
      </section>
    </main>
  );
}

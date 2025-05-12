// import { useActionState } from 'react';
import { Metadata } from "next";
import CreateForm from "../../../../components/ui/restaurants/create-form";
import { inter } from "../../../../components/fonts";
// import { createRestaurant, State } from '@/lib/actions';

export const metadata: Metadata = {
  title: "Create Restaurant",
};
export default async function CreateRestaurant({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  // const initialState: State = {message: null} // setting up initial state
  // const createRestaurantWithUserId = createRestaurant.bind(null, params.id);
  // const [state, formAction] = useActionState(createRestaurantWithUserId, initialState);

  // this is the userId here

  return (
    <main
      className={`${inter.className} grid lg:grid-cols-2 pt-10 px-3 gap-5 pb-16`}
    >
      <section className="flex items-center justify-center text-xl">
        Register your restaurant with us
      </section>
      <section className="flex justify-center items-center w-full">
        <CreateForm userId={(await params).userId} />
      </section>
    </main>
  );
}

import React from "react";

export default async function Menu({ params }: { params: { menuId: string } }) {
  const { menuId } = params;

  return <div>menuid: {menuId}</div>;
}

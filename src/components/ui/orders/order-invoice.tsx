"use client";
import { useState } from "react";
import { UserProps } from "./checkout-button";
import { TrackOrderProps } from "@/lib/definition";
import { useUser } from "@/app/hooks/UserContext";

// userId, orderId
export default function OrderInvoice({ order }: { order: TrackOrderProps }) {
  const user = useUser() as UserProps;
  const [isGenerating, setIsGenerating] = useState(false);

  const createInvoice = async () => {
    // Only import on client side when button is clicked
    if (typeof window === "undefined") return;

    try {
      setIsGenerating(true);
      
      // Dynamic import to avoid SSR issues
      const jsPDFInvoiceTemplate = (await import("jspdf-invoice-template")).default;
      const { OutputType } = await import("jspdf-invoice-template");
      
      const props = {
        outputType: OutputType.Save,
        onJsPDFDocCreation: () => {}, // Allows for additional configuration prior to writing
        returnJsPDFDocObject: true,
        fileName: "DineSphere order-invoice",
        orientationLandscape: false,
        compress: true,
        logo: {
          src: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yankzbDVYTGZMYktidDhoWGRYY054MUxzdmgifQ",
          type: "PNG",
          width: 53.33,
          height: 26.66,
          margin: {
            top: 0,
            left: 0,
          },
        },
        business: {
          name: "DineSphere",
          address: "HBH",
          phone: "+91 8580496476",
          email: "workwithaniket18@gmail.com",
          website: "https://dinesphere.vercel.app",
        },
        contact: {
          label: "Invoice issued for:",
          name: `${user?.firstName} ${user?.lastName}`,
          address: `${user?.address || "Address not provided by user"}`,
          email: `${user?.email}`,
        },
        invoice: {
          label: "Invoice #: ",
          num: 1,
          invDate: `Payment Date: ${new Date(order.createdAt).toDateString()}`,
          invGenDate: `Invoice Date: ${new Date().toDateString()}`,
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#",
              style: {
                width: 10,
              },
            },
            {
              title: "Order",
              style: {
                width: 40,
              },
            },
            {
              title: "Description",
              style: {
                width: 80,
              },
            },
            { title: "Price" },
            { title: "Quantity" },
            { title: "Total" },
          ],
          table: Array.from(Array(order.orderItems.length), (item, index) => [
            index + 1,
            `${order.orderItems[index].menuDetails.name}`,
            `${order.orderItems[index].menuDetails.description}`,
            `${order.orderItems[index].menuDetails.price}`,
            `${order.orderItems[index].quantity}`,
            `${order.orderItems[index].price}`,
          ]),
          additionalRows: [
            {
              col1: "Total (incl. GST):",
              col2: `${order.totalPrice}`,
              style: {
                fontSize: 14,
              },
            },
          ],
          invDescLabel: "Thank you for using DineSphere",
          invDesc:
            "Thank you for choosing DineSphere for your food ordering needs! We are thrilled to have you as a part of our community and appreciate your trust in us to deliver delicious meals right to your doorstep.Your support means the world to us, and we are committed to providing you with the best possible experience. If you have any feedback or suggestions on how we can improve our service, please don't hesitate to reach out",
        },
        footer: {
          text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      };
      
      jsPDFInvoiceTemplate(props);
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Failed to generate invoice. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      className="text-xs cursor-pointer text-neutral-800 font-medium hover:border-b duration-75 hover:border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={createInvoice}
      disabled={isGenerating}
    >
      {isGenerating ? "Generating..." : "Download invoice"}
    </button>
  );
}

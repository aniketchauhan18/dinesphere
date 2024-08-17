// import { jsPDF } from "jspdf";
"use client";
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from "jspdf-invoice-template";
import { User } from "./checkout-button";
import { OrderProps, TrackOrderProps } from "@/lib/definition";
import { Button } from "../button";

// userId, orderId
export default function OrderInvoice({
  user,
  order,
}: {
  user: User;
  order: TrackOrderProps;
}) {
  // const [user, order]: [User, OrderProps] = await Promise.all([
  //   fetchUserById(userId),
  //   fetchOrderById(orderId)
  // ])

  // const currentDate = new Date().getDate();
  let props = {
    outputType: OutputType.Save,
    onJsPDFDocCreation: (jsPDFDoc: jsPDF) => {}, //Allows for additional configuration prior to writing among others, adds support for different languages and symbols
    returnJsPDFDocObject: true,
    fileName: "DineSphere order-invoice",
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yankzbDVYTGZMYktidDhoWGRYY054MUxzdmgifQ",
      type: "PNG", //optional, when src= data:uri (nodejs case)
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    // stamp: {
    //     inAllPages: false, //by default = false, just in the last page
    //     src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
    //     type: 'JPG', //optional, when src= data:uri (nodejs case)
    //     width: 20, //aspect ratio = width/height
    //     height: 20,
    //     margin: {
    //         top: 0, //negative or positive num, from the current position
    //         left: 0 //negative or positive num, from the current position
    //     }
    // },
    business: {
      name: "DineSphere",
      address: "HBH",
      phone: "+91 8580496476",
      email: "workwithaniket18@gmail.com",
      website: "https://dinesphere.vercel.app",
    },
    contact: {
      label: "Invoice issued for:",
      name: `${user.firstName} ${user.lastName}`,
      address: `${user.address || "Address not provided by user"}`,
      // phone: "(+355) 069 22 22 222", // will add this later
      email: `${user.email}`,
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
            fontSize: 14, //optional, default 12
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
  const createInvoice = () => {
    return jsPDFInvoiceTemplate(props); // Returns number of pages created
  };
  return (
    <div
      className="text-xs cursor-pointer text-neutral-800 font-medium hover:border-b duration-75 hover:border-neutral-800"
      onClick={createInvoice}
    >
      Download invoice
    </div>
  );
}

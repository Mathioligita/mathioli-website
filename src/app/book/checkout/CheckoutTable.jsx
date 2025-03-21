// import { Avatar } from "primereact/avatar";
// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
// import React from "react";
// import { CiCircleRemove } from "react-icons/ci";

// export default function CheckoutTable({
//   removeFromCart,
//   singleselectbooks,
//   selectedhardcopy,
//   checkout,
//   selecteditemhardcopy,
//   availabilityBodyTemplate,
//   SingleBuyProductdata
// }) {

//     console.log(SingleBuyProductdata,"SingleBuyProductdata")
//   return (
//     <div>
//       {singleselectbooks.length && selectedhardcopy ? (
//         <DataTable
//           className="shippingaddress-item-4 "
//           style={{
//             border: " 1px solid white",
//             borderRadius: "8px",
//             background: "white",
//           }}
//           value={singleselectbooks}
//         >
//           <Column
//             headerStyle={{ display: "none" }}
//             showHeaders={false}
//             style={{
//               // alignItems: "start",
//               display: "flex",
//               justifyContent: "start",
//             }}
//             field="productId.name"
//             body={(rowData) => (
//               <div className="d-flex ">
//                 <div
//                   // style={{ display: "flex", alignItems: "center" }}
//                   className="text-start"
//                 >
//                   <Avatar
//                     image={rowData?.bookimage[0]}
//                     size="larger"
//                     className="avatarimage-valeues"
//                     style={{
//                       marginRight: "16px",
//                       height: "90px",
//                       width: "100%",
//                       objectFit: "contain ",
//                     }}
//                   />
//                   <div
//                     className="d-flex"
//                     style={{
//                       justifyContent: "space-between",
//                       textAlign: "center",
//                     }}
//                   ></div>
//                 </div>
//                 <div className="my-auto">
//                   <span>{rowData?.bookId?.title || rowData?.title}</span>
//                 </div>
//               </div>
//             )}
//           ></Column>
//           <Column
//             headerStyle={{ display: "none" }}
//             body={(rowData) => (
//               <span>
//                 Qty: {singleselectbooks ? 1 : rowData?.bookId.quantity}
//               </span>
//             )}
//           ></Column>
//           <Column
//             headerStyle={{ display: "none", padding: "0px" }}
//             field="subtotal"
//             className="aviablity-strch-remmove"
//             body={(rowData) => (
//               <div
//                 className={`my-auto ${
//                   selecteditemhardcopy ? "remove-values" : ""
//                 }`}
//               >
//                 <div style={{ marginLeft: "10px", fontWeight: "800" }}>
//                   {selecteditemhardcopy ? (
//                     availabilityBodyTemplate(rowData)
//                   ) : (
//                     <span
//                       className="fw-bold fs-6"
//                       style={{ fontWeight: "800" }}
//                     >
//                       {` ₹ ${rowData?.subtotal?.toFixed(2) || rowData?.price}
//                                 `}
//                     </span>
//                   )}
//                   {/* {availabilityBodyTemplate(rowData)} */}
//                 </div>
//               </div>
//             )}
//           ></Column>
//           <Column
//             field="subtotal"
//             headerStyle={{ display: "none" }}
//             body={(rowData) => (
//               <div
//                 onClick={() => removeFromCart(rowData)}
//                 style={{
//                   fontWeight: "800",
//                   color: "black",
//                   fontSize: "25px",
//                 }}
//               >
//                 <CiCircleRemove />
//               </div>
//             )}
//           />
//         </DataTable>
//       ) : (
//         <DataTable
//           className="shippingaddress-item-4 "
//           style={{
//             border: "1px solid white",
//             borderRadius: "8px",
//             background: "white",
//           }}
//           value={checkout ? checkout : SingleBuyProductdata}
//         >
//           {/* <div
//                       className="d-flex"
//                       style={{ justifyContent: "space-between" }}
//                     > */}
//           <Column
//             headerStyle={{ display: "none" }}
//             showHeaders={false}
//             style={
//               {
//                 // alignItems: "start",
//                 // justifyContent: "space-between",
//               }
//             }
//             field="productId.name"
//             body={(rowData) => (
//               <>
//                 {console.log(rowData, "RowData")}
//                 <div
//                   className="d-flex ms-auto"
//                   style={{
//                     // justifyContent: "space-between",
//                     textAlign: "start",
//                   }}
//                 >
//                   <div
//                     style={
//                       {
//                         // display: "flex",
//                         // alignItems: "center",
//                         // justifyContent: "space-between",
//                       }
//                     }
//                     className="text-start d-flex"
//                   >
//                     <Avatar
//                       image={
//                         rowData?.bookId?.bookimage[0] ||
//                         rowData?.book?.bookimage[0]
//                         // rowData?.bookimage[0]
//                       }
//                       size="larger"
//                       className="avatarimage-valeues"
//                       style={{
//                         marginRight: "16px",
//                         height: "90px",
//                         width: "100%",
//                         objectFit: "contain ",
//                       }}
//                     />
//                   </div>
//                   <div className="my-auto">
//                     {/* <span> */}
//                     {rowData?.bookId?.title || rowData?.title}
//                     {/* </span> */}
//                   </div>
//                 </div>
//               </>
//             )}
//           ></Column>
//           <Column
//             headerStyle={{ display: "none" }}
//             body={(rowData) => (
//               <span className="ms-auto">Qty: {rowData?.quantity}</span>
//             )}
//           ></Column>
//           <Column
//             headerStyle={{ display: "none", padding: "0px" }}
//             field="subtotal"
//             className="aviablity-strch-remmove"
//             body={(rowData) => (
//               <div
//                 className={`my-auto ${
//                   selecteditemhardcopy ? "remove-values" : ""
//                 }`}
//               >
//                 <div style={{ marginLeft: "10px" }}>
//                   {selecteditemhardcopy ? (
//                     availabilityBodyTemplate(rowData)
//                   ) : (
//                     <span style={{ fontWeight: "800" }}>
//                       {` ₹ ${rowData?.subtotal?.toFixed(2) || rowData?.price}`}
//                     </span>
//                   )}
//                   {/* {availabilityBodyTemplate(rowData)} */}
//                 </div>
//               </div>
//             )}
//           ></Column>
//           <Column
//             field="subtotal"
//             headerStyle={{ display: "none" }}
//             body={(rowData) => (
//               <div
//                 onClick={() => removeFromCart(rowData)}
//                 style={{
//                   fontWeight: "800",
//                   color: "black",
//                   fontSize: "25px",
//                 }}
//               >
//                 <CiCircleRemove />
//               </div>
//             )}
//           />
//           {/* </div> */}
//         </DataTable>
//       )}
//     </div>
//   );
// }
import { Avatar } from "primereact/avatar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";

export default function CheckoutTable({
  removeFromCart,
  singleselectbooks,
  selectedhardcopy,
  checkout,
  selecteditemhardcopy,
  availabilityBodyTemplate,
  SingleBuyProductdata,
}) {
//   const renderAvatar = (rowData) => (
//     <>
//     {console.log(rowData, "rowdata>>>>>>>>>>>")}
//     <Avatar
//       image={
//         rowData?.bookId?.bookimage[0] ||
//         rowData?.book?.bookimage[0] ||
//         rowData?.bookimage?.length>0 ? rowData?.bookimage[0] :''
//       }
//       size="larger"
//       className="avatarimage-valeues"
//       style={{
//           marginRight: "16px",
//           height: "90px",
//           width: "100%",
//           objectFit: "contain",
//         }}
//         />
//         </>
//   );
const renderAvatar = (rowData) => (
    <>
      {console.log(rowData, "rowdata>>>>>>>>>>>")}
      <Avatar
        image={
          rowData?.bookId?.bookimage?.[0] ||
          rowData?.book?.bookimage?.[0] ||
          (rowData?.bookimage?.length > 0 ? rowData?.bookimage?.[0] : "")
        }
        size="larger"
        className="avatarimage-valeues"
        style={{
          marginRight: "16px",
          height: "90px",
          width: "100%",
          objectFit: "contain",
        }}
      />
    </>
  );
  

  const renderTitle = (rowData) => (
    <span>{rowData?.bookId?.title || rowData?.title}</span>
  );

  const renderQuantity = (rowData) => (
    <span>
      Qty:{" "}
      {singleselectbooks ? 1 : rowData?.bookId?.quantity || rowData?.quantity}
    </span>
  );

  const renderPrice = (rowData) => (
    <div style={{ marginLeft: "10px", fontWeight: "800" }}>
      {selecteditemhardcopy ? (
        availabilityBodyTemplate(rowData)
      ) : (
        <span>{`₹ ${rowData?.subtotal?.toFixed(2) || rowData?.price}`}</span>
      )}
    </div>
  );

  const renderRemoveButton = (rowData) => (
    <div
      onClick={() => removeFromCart(checkout ? rowData : null)}
      style={{ fontWeight: "800", color: "black", fontSize: "25px" }}
    >
      <CiCircleRemove />
    </div>
  );

  const tableStyle = {
    border: "1px solid white",
    borderRadius: "8px",
    background: "white",
  };

  return (
    <div>
      {singleselectbooks.length && selectedhardcopy ? (
        <DataTable
          className="shippingaddress-item-4"
          style={tableStyle}
          value={singleselectbooks}
        >
          <Column
            headerStyle={{ display: "none" }}
            showHeaders={false}
            body={(rowData) => (
              <div className="d-flex">
                {renderAvatar(rowData)}
                <div className="my-auto">{renderTitle(rowData)}</div>
              </div>
            )}
          />
          <Column headerStyle={{ display: "none" }} body={renderQuantity} />
          <Column
            headerStyle={{ display: "none", padding: "0px" }}
            body={renderPrice}
          />
          <Column headerStyle={{ display: "none" }} body={renderRemoveButton} />
        </DataTable>
      ) : (
        <DataTable
          className="shippingaddress-item-4"
          style={tableStyle}
          value={
            !SingleBuyProductdata.length > 0 ? checkout : SingleBuyProductdata
          }
        >
          <Column
            headerStyle={{ display: "none" }}
            showHeaders={false}
            body={(rowData) => (
              <div className="d-flex ms-auto" style={{ textAlign: "start" }}>
                {renderAvatar(rowData)}
                <div className="my-auto">{renderTitle(rowData)}</div>
              </div>
            )}
          />
          <Column headerStyle={{ display: "none" }} body={renderQuantity} />
          <Column
            headerStyle={{ display: "none", padding: "0px" }}
            body={renderPrice}
          />
          <Column headerStyle={{ display: "none" }} body={renderRemoveButton} />
        </DataTable>
      )}
    </div>
  );
}

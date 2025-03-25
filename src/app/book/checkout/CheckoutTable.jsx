import { Avatar } from "primereact/avatar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import "./checkouttable.css";

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
      <div>
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
      </div>
    </>
  );

  const renderTitle = (rowData) => (
    <span style={{ textAlign: "start" }} className="me-auto checkout-title-gdf">
      {rowData?.bookId?.title || rowData?.title || rowData?.book?.title}
    </span>
  );

  const renderQuantity = (rowData) => (
    // console.log(rowData, "rowdata>>>>>>>>>>>>>");
    <span>
      Qty:{" "}
      {singleselectbooks.length
        ? 1
        : rowData?.quantity || rowData?.quantity || rowData?.quantity}
    </span>
  );

  const renderPrice = (rowData) => (
    <div
      style={{ marginLeft: "10px", fontWeight: "800" }}
      className="my-auto text-end"
    >
      {selecteditemhardcopy ? (
        <div className="mt-5">{availabilityBodyTemplate(rowData)}</div>
      ) : (
        <span>{`₹ ${rowData?.subtotal?.toFixed(2) || rowData?.price}`}</span>
      )}
    </div>
  );

  const renderRemoveButton = (rowData) => (
    <div
      onClick={() => removeFromCart(checkout ? rowData : null)}
      style={{
        fontWeight: "800",
        color: "black",
        fontSize: "25px",
        marginLeft: "12px",
      }}
    >
      <CiCircleRemove />
    </div>
  );

  const tableStyle = {
    border: "1px solid white",
    borderRadius: "8px",
    background: "white",
  };

  const items =
    singleselectbooks.length && selectedhardcopy
      ? singleselectbooks
      : !SingleBuyProductdata.length > 0
      ? checkout
      : SingleBuyProductdata;
  return (
    <>
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
                <div
                  className="d-flex me-auto "
                  style={{ justifyContent: "start" }}
                >
                  {renderAvatar(rowData)}
                  <div className="my-auto me-auto">{renderTitle(rowData)}</div>
                </div>
              )}
            />
            <Column headerStyle={{ display: "none" }} body={renderQuantity} />
            <Column
              headerStyle={{ display: "none", padding: "0px" }}
              body={renderPrice}
            />
            <Column
              headerStyle={{ display: "none" }}
              body={renderRemoveButton}
            />
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
                <div
                  className="d-flex me-auto"
                  style={{ textAlign: "start", justifyContent: "start" }}
                >
                  {renderAvatar(rowData)}
                  <div className="my-auto me-auto ">{renderTitle(rowData)}</div>
                </div>
              )}
            />
            <Column headerStyle={{ display: "none" }} body={renderQuantity} />
            <Column
              headerStyle={{ display: "none", padding: "0px" }}
              body={renderPrice}
            />
            <Column
              headerStyle={{ display: "none" }}
              body={renderRemoveButton}
            />
          </DataTable>
        )}
      </div>
      <div className="responsive-table">
        <div className="mobile-view">
          {items.map((rowData) => (
            <div key={rowData.id} className="mobile-item" style={tableStyle}>
              <div className="mobile-item-row ">
                <div>{renderAvatar(rowData)}</div>
                <div>{renderTitle(rowData)}</div>
                <div className="mobile-item-details">
                  <div style={{ fontSize: "12px" }}></div>
                  {renderPrice(rowData)}
                </div>
                {renderRemoveButton(rowData)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
// import { Avatar } from "primereact/avatar";
// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
// import React from "react";
// import { CiCircleRemove } from "react-icons/ci";
// import "./checkouttable.css"; // Import a CSS file for custom styles

// export default function CheckoutTable({
//   removeFromCart,
//   singleselectbooks,
//   selectedhardcopy,
//   checkout,
//   selecteditemhardcopy,
//   availabilityBodyTemplate,
//   SingleBuyProductdata,
// }) {
//   const renderAvatar = (rowData) => (
//     <div>
//       <Avatar
//         image={
//           rowData?.bookId?.bookimage?.[0] ||
//           rowData?.book?.bookimage?.[0] ||
//           (rowData?.bookimage?.length > 0 ? rowData?.bookimage?.[0] : "")
//         }
//         size="larger"
//         className="avatarimage-valeues"
//         style={{
//           marginRight: "16px",
//           height: "90px",
//           width: "100%",
//           objectFit: "contain",
//         }}
//       />
//     </div>
//   );

//   const renderTitle = (rowData) => (
//     <span style={{ textAlign: "start" }} className="me-auto">
//       {rowData?.bookId?.title || rowData?.title || rowData?.book?.title}
//     </span>
//   );

//   const renderQuantity = (rowData) => (
//     <span>
//       Qty:{" "}
//       {singleselectbooks.length
//         ? 1
//         : rowData?.quantity || rowData?.quantity || rowData?.quantity}
//     </span>
//   );

//   const renderPrice = (rowData) => (
//     <div style={{ marginLeft: "10px", fontWeight: "800" }} className="my-auto">
//       {selecteditemhardcopy ? (
//         <div className="mt-5">{availabilityBodyTemplate(rowData)}</div>
//       ) : (
//         <span>{`₹ ${rowData?.subtotal?.toFixed(2) || rowData?.price}`}</span>
//       )}
//     </div>
//   );

//   const renderRemoveButton = (rowData) => (
//     <div
//       onClick={() => removeFromCart(checkout ? rowData : null)}
//       style={{ fontWeight: "800", color: "black", fontSize: "25px" }}
//     >
//       <CiCircleRemove />
//     </div>
//   );

//   const tableStyle = {
//     border: "1px solid white",
//     borderRadius: "8px",
//     background: "white",
//   };
//   const items =
//     singleselectbooks.length && selectedhardcopy
//       ? singleselectbooks
//       : !SingleBuyProductdata.length > 0
//       ? checkout
//       : SingleBuyProductdata;

//   return (
//     <div className="responsive-table">
//       {singleselectbooks.length && selectedhardcopy ? (
//         <DataTable
//           className="shippingaddress-item-4"
//           style={tableStyle}
//           value={singleselectbooks}
//         >
//           <Column
//             headerStyle={{ display: "none" }}
//             showHeaders={false}
//             body={(rowData) => (
//               <div
//                 className="d-flex me-auto "
//                 style={{ justifyContent: "start" }}
//               >
//                 {renderAvatar(rowData)}
//                 <div className="my-auto me-auto">{renderTitle(rowData)}</div>
//               </div>
//             )}
//           />
//           <Column headerStyle={{ display: "none" }} body={renderQuantity} />
//           <Column
//             headerStyle={{ display: "none", padding: "0px" }}
//             body={renderPrice}
//           />
//           <Column headerStyle={{ display: "none" }} body={renderRemoveButton} />
//         </DataTable>
//       ) : (
//         <DataTable
//           className="shippingaddress-item-4"
//           style={tableStyle}
//           value={
//             !SingleBuyProductdata.length > 0 ? checkout : SingleBuyProductdata
//           }
//         >
//           <Column
//             headerStyle={{ display: "none" }}
//             showHeaders={false}
//             body={(rowData) => (
//               <div
//                 className="d-flex me-auto"
//                 style={{ textAlign: "start", justifyContent: "start" }}
//               >
//                 {renderAvatar(rowData)}
//                 <div className="my-auto me-auto ">{renderTitle(rowData)}</div>
//               </div>
//             )}
//           />
//           <Column headerStyle={{ display: "none" }} body={renderQuantity} />
//           <Column
//             headerStyle={{ display: "none", padding: "0px" }}
//             body={renderPrice}
//           />
//           <Column headerStyle={{ display: "none" }} body={renderRemoveButton} />
//         </DataTable>
//       )}
//     </div>
//   );
// }

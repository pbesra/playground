import { Parent } from "./components/Parent";

export const Product = () => {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 4,
          marginTop: 20,
          display: "flex",
        }}
      >
        <Parent />
      </div>
    </>
  );
};

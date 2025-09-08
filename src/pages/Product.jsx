import { useProducts } from "../shared/";
import { useEffect, useState } from "react";
import { Table } from "../components/organism/Table";
import { Form } from "../components/organism/Form";



export const Product = () => {
  const { products, isLoading, getProducts } = useProducts();
  const headers = ["Nombre", "Descripción", "Precio", "Categoría", "Acciones"];
  const [openForm, setOpenForm] = useState(false);
  let rows = [];
  useEffect(() => {
    getProducts();
  }, []);

  const onBlurInput= (e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name],
        value,
      },
    }));
  }
  const onChangeInput= (e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name],
        value,
      },
    }));
  }
  const [fields, setFields] = useState({
    name: {
      text: "Nombre",
      refInput: "name",
      description: "Nombre del producto",
      type: "text",
      value: "",
      error: "",
      onChange: onChangeInput,
      onBlur: onBlurInput,
    },
    description: {
      text: "Descripción",
      refInput: "description",
      description: "Descripción del producto",
      type: "text",
      value: "",
      error: "",
      onChange: onChangeInput,
      onBlur: onBlurInput,
    },
    price: {
      text: "Precio",
      refInput: "price",
      description: "Precio del producto",
      type: "number",
      value: "",
      error: "",
      onChange: onChangeInput,
      onBlur: onBlurInput,
    },
    category: {
      text: "Categoría",
      refInput: "category",
      description: "Categoría del producto",
      type: "text",
      value: "",
      error: "",
      onChange: onChangeInput,
      onBlur: onBlurInput,
    },
  });

  if (products) {
    rows = products.products.map((product) => [
      product.name,
      product.description,
      product.price,
      product.category,
      "",
    ]);
  }

  const clickOnDelete = (id) => {};

  const clickOnEdit = (id) => {};

  const clickOnAdd = (event) => {
    event.preventDefault();
    setOpenForm(true);
  };

  return (
    <>
      <div className="section-template">
        <div className="header-section">
          <h1>Productos</h1>
          <button className="add-button" onClick={clickOnAdd}>
            Agregar
          </button>
        </div>
        <div className="form-section">
          {openForm && <Form id="form-product" fields={fields} />}
        </div>
        <div className="table-section">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <Table
              rows={rows}
              headers={headers}
              delete={clickOnDelete}
              edit={clickOnEdit}
            />
          )}
        </div>
      </div>
    </>
  );
};

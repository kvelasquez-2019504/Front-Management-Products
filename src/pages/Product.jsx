import { useProducts } from "../shared/";
import { useEffect, useState } from "react";
import { Table } from "../components/organism/Table";
import { Form } from "../components/organism/Form";

/* Form fields = key={index}
                        text={field.text} 
                        refInput={field.refInput} 
                        description={field.description}
                        type={field.type} value={field.value} 
                        error={field.error}
                        onChange={field.onChange} 
                        onBlur={field.onBlur}
*/
export const Product = () => {
  const { products, isLoading, getProducts } = useProducts();
  const headers = ["Nombre", "Descripción", "Precio", "Categoría", "Acciones"];
  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState({
    status: false,
    id: null,
  });
  let rows = [];
  useEffect(() => {
    getProducts();
  }, []);

  const validateField = (name, value) => {
    let isValid = true;
    if (!value) {
        isValid = false;
    }
    return isValid;
  }

  const onBlurInput= (e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name],
        value,
        error: validateField(name, value) ? "" : "Este campo es obligatorio",
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
        error: validateField(name, value) ? "" : "Este campo es obligatorio",
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
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      "",
    ]);
  }

  const clickOnDelete = (id) => {
    console.log("Eliminando producto con id: ", id);
  };

  const clickOnEdit = (id) => {
    setEdit({ status: true, id: id });
    console.log(id)
    const productToEdit = products.products.find((product) =>{
      if(product.id==id){
        return product;
      }
    });
    if (productToEdit) {
      setFields((prevState) => ({
        ...prevState,
        name: { ...prevState.name, value: productToEdit.name, error: "" },
        description: { ...prevState.description, value: productToEdit.description, error: "" },
        price: { ...prevState.price, value: productToEdit.price, error: "" },
        category: { ...prevState.category, value: productToEdit.category, error: "" },
      }));
      setOpenForm(true);
    }
  };

  const clickOnAdd = (event) => {
    event.preventDefault();
    setOpenForm(true);
  };

  const submitEvent= (e)=>{
    e.preventDefault();
    if(edit.status){
      console.log("Editando producto con id: ", edit.id);
    }else{
      console.log("Creando nuevo producto");
    }
  }

  const closeForm= (e)=>{
    e.preventDefault();
    setOpenForm(false);
    setFields(prevState=>({
      ...prevState,
      name:{...prevState.name, value:"", error:""},
      description:{...prevState.description, value:"", error:""},
      price:{...prevState.price, value:"", error:""},
      category:{...prevState.category, value:"", error:""},
    }));
    setEdit({status:false, id:null});
  }

  return (
    <>
      <div className="section-template">
        <div className="header-section">
          <h1>Productos</h1>
          <button className="add-button" onClick={clickOnAdd}>
            Agregar
          </button>
        </div>
        <div className={`form-section ${openForm ? "open" : "close"}`}>
          {openForm && <Form id="form-product" fields={fields} actionForm={submitEvent} closeForm={closeForm} />}
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

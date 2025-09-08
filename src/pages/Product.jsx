import { useProducts } from "../shared/";
import { useEffect, useState } from "react";
import { Table } from "../components/organism/Table";
import { Form } from "../components/organism/Form";
import { Pagination } from "../components/molecules/Pagination";
import "../styles/Table.css"

/**
 * Página principal de gestión de productos.
 * Permite listar, agregar, editar, eliminar y paginar productos.
 * Utiliza hooks personalizados y componentes reutilizables para la UI.
 * @component
 */
export const Product = () => {
  // Hook personalizado para lógica de productos (fetch, add, update, delete)
  const { products, isLoading, getProducts, addProduct, deleteProduct, updateProduct } = useProducts();
  // Encabezados de la tabla
  const headers = ["Nombre", "Descripción", "Precio", "Categoría", "Acciones"];
  // Estado para mostrar/ocultar formulario
  const [openForm, setOpenForm] = useState(false);
  // Estado para modo edición
  const [edit, setEdit] = useState({
    status: false,
    id: null,
  });

  let rows = [];
  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  /**
   * Cambia la página actual en la paginación
   * @param {number} page
   */
  const handlePageChange = (page) => setCurrentPage(page);

  // Carga productos al cambiar de página
  useEffect(() => {
    getProducts(currentPage, itemsPerPage);
  }, [currentPage]);



  /**
   * Obtiene los datos del formulario como objeto producto
   * @returns {Object} producto
   */
  const getProductForm = () => {
    const product = {
      name: fields.name.value,
      description: fields.description.value,
      price: fields.price.value,
      category: fields.category.value
    }
    return product;
  }

  if (products && products.products ) {
    rows = products.products.map((product) => [
        product.id,
        product.name,
        product.description,
        product.price,
        product.category,
        "",
    ]);
  }


  /**
   * Valida si un campo tiene valor (no vacío)
   * @param {string} name
   * @param {string} value
   * @returns {boolean}
   */
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



  /**
   * Elimina un producto y recarga la lista
   * @param {string} id
   */
  const clickOnDelete = async (id) => {
    await deleteProduct(id);
    getProducts(currentPage, itemsPerPage);
  };


  /**
   * Activa el modo edición y carga los datos del producto seleccionado en el formulario
   * @param {string} id
   */
  const clickOnEdit = (id) => {
    setEdit({ status: true, id: id });
    const productToEdit = products.products.find(product => product.id === id);
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


  /**
   * Abre el formulario para agregar un nuevo producto
   * @param {Event} event
   */
  const clickOnAdd = (event) => {
    event.preventDefault();
    setOpenForm(true);
  };


  /**
   * Maneja el submit del formulario para agregar o editar productos
   * @param {Event} e
   */
  const submitEvent = async (e) => {
    e.preventDefault();
    if (edit.status) {
      await updateProduct(edit.id, getProductForm());
      getProducts(currentPage, itemsPerPage);
      setEdit({ status: false, id: null });
      setOpenForm(false);
      setFields(prevState => ({
        ...prevState,
        name: { ...prevState.name, value: "", error: "" },
        description: { ...prevState.description, value: "", error: "" },
        price: { ...prevState.price, value: "", error: "" },
        category: { ...prevState.category, value: "", error: "" },
      }));
    } else {
      await addProduct(getProductForm());
      getProducts(currentPage, itemsPerPage);
      setOpenForm(false);
      setFields(prevState => ({
        ...prevState,
        name: { ...prevState.name, value: "", error: "" },
        description: { ...prevState.description, value: "", error: "" },
        price: { ...prevState.price, value: "", error: "" },
        category: { ...prevState.category, value: "", error: "" },
      }));
    }
  }


  /**
   * Cambia la cantidad de items por página y recarga la lista
   * @param {Event} e
   */
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setCurrentPage(1);
    setItemsPerPage(newItemsPerPage);
    getProducts(1, newItemsPerPage); // Reset to first page when items per page changes
  }



  /**
   * Cierra el formulario y limpia los campos
   * @param {Event} e
   */
  const closeForm = (e) => {
    e.preventDefault();
    setOpenForm(false);
    setFields(prevState => ({
      ...prevState,
      name: { ...prevState.name, value: "", error: "" },
      description: { ...prevState.description, value: "", error: "" },
      price: { ...prevState.price, value: "", error: "" },
      category: { ...prevState.category, value: "", error: "" },
    }));
    setEdit({ status: false, id: null });
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
          {isLoading && products? (
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
        {
          <Pagination currentPage={currentPage} totalPages={products?.totalPages} onPageChange={handlePageChange} 
                  itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange} />
        }
      </div>
    </>
  );
};

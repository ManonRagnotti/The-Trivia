class api {
  async getCategories(){

  }
  async getCategoryById(){
    const response = await fetch(`http://jservice.io/api/category?id=${id}`);
    const json = await response.json();
    return json;
  }
}

export default new api();

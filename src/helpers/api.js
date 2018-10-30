class api {
  async getCategories(){
    
  }
  async getCategoryById(){
    const response = await fetch(`http://jservice.io/api/categories?id=${id}`);
    const json = await response.json();
    return json;
  }
}

export default new api();

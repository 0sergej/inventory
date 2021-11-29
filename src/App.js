import SearchBar from './SearchBar';
import { useState, useEffect } from 'react'
import AddItem from "./AddItem";
import ItemsDisplay from './ItemsDisplay';


function App()
{
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  useEffect(() =>
  {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then(data =>  setData({items: data}));
  }, [])
  

  const updateFilters = (searchParameters) =>
  {
    setFilters(searchParameters);
  }

  const deleteItem = (item) =>
  {
    const items = data["items"];
    const requestOptions = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then((response) =>
    {
      if (response.ok)
      {
        const idx = items.indexOf(item);
        items.splice(idx, 1);
        setData({items: items});
      }
    }
    );
  }

  const addItemToData = (item) =>
  {
    let items = data["items"];
    /*
    get
    post
    put
    delete
    */
    const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((data) =>
      {
        items.push(data);
        setData({ items: items });
      });
    
  }

  const filterData = (data) =>
  {
    const filteredData = [];

    if (!filters.name)
    {
      return data;
    }
    

    for (const item of data)
    {
      if (filters.name !== "" && item.name !== filters.name)
        {
          continue;
      }
      if (filters.price !== 0 && item.price > filters.price)
      {
        continue;
      }
      if (filters.type !== "" && item.type !== filters.type)
      {
        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand)
      {
        continue;
      }

      filteredData.push(item);

   }

    return filteredData;
  }


  return (
    <div className="container">
      <div className="row">
        <ItemsDisplay deleteItem={deleteItem} items={filterData(data["items"])} />
      </div>
      <div className="row mt-5">
        <SearchBar callback={updateFilters} />
      </div>
      <div className="row">
        <AddItem addItem={addItemToData} />
      </div>
    </div>
  );
}

export default App;

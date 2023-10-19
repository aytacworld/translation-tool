import {useState} from 'react';
import './App.css';
import SearchBox from './components/search';

const data = {
  data: {
   1: {id: 1, key: 'title', translations: { nl_BE: 'Mijn App', fr_BE: 'Mon App' }},
   2: {id: 2, key: 'apply', translations: { nl_BE: 'toepassen', fr_BE: 'appliquer' }},
  },
  keys: [
    'title',
    'apply',
  ],
  codes: [
    'nl_BE',
    'fr_BE',
  ],
};

function App() {

  const [translations, setTranslations ] = useState(data.data);
  const [dirty, setDirty] = useState({});

  const updateTranslation = (id, code, dirtyField, value) => {
    setTranslations(tr => {
      tr[id].translations[code] = value;

      return tr;
    });

    setDirty((d) => ({...d, [dirtyField]: true}));
  }

  const update = () => {
    setDirty({});
  }

  return (
    <>
      <h1>Translation Tool</h1>

      <SearchBox onChange={console.log}/>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Key</th>
            { data.codes.map((code, index) => (<th key={code+index}>{ code }</th>)) }
          </tr>
        </thead>
        <tbody>
          { Object.keys(translations).map((key) => {
            const item = translations[key];
            return <tr key={item.key+item.id}>
                     <td>{item.id}</td>
                     <td>{item.key}</td>
                     { data.codes.map((code) => (
                       <td key={item.key+item.id+code}>
                         <input
                           className={dirty[item.key+"_"+code] && 'modified'}
                           name={item.key+"_"+code}
                           defaultValue={item.translations[code]}
                           onChange={(e) => updateTranslation(item.id, code, item.key+"_"+code, e.target.value)}
                         />
                       </td>
                     ))}
                   </tr>
          })}
        </tbody>
      </table>

      <button onClick={update}>Update</button>
    </>
  )
}

export default App

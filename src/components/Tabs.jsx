
import React, { useState } from 'react';
import { useQuery } from 'react-query';


const Tabs = () => {

    // const tabs = [
    //     {
    //         id: 1,
    //         tabTitle: 'Tab 1',
    //         title: 'Title 1',
    //         content: 'In sint do non adipisicing incididunt excepteur sit. Voluptate esse aliqua pariatur dolor ex occaecat sunt eu. Pariatur ullamco id dolore sint proident sint nostrud nisi sit id est. Duis et excepteur cupidatat sint nisi dolore qui irure qui in id excepteur irure laboris. Pariatur mollit duis cupidatat nisi Lorem non et in dolor aliquip ea sint aute. Dolore aute duis laboris exercitation occaecat sunt. Enim veniam Lorem do ipsum aliqua qui eu ipsum consectetur ex dolore ea ipsum.'
    //     },
    //     {
    //         id: 2,
    //         tabTitle: 'Tab 2',
    //         title: 'Title 2',
    //         content: 'Non aliquip fugiat velit ad officia Lorem tempor cillum incididunt elit proident mollit. Reprehenderit qui nisi ut occaecat minim velit deserunt occaecat quis magna mollit. Veniam proident consectetur sunt mollit est magna Lorem voluptate enim cupidatat consequat. Et pariatur aliquip commodo nisi deserunt exercitation enim officia voluptate in nisi. Eu ea esse qui est ea pariatur nostrud non elit irure. Ad exercitation Lorem exercitation ipsum eiusmod ea duis ad mollit veniam aliquip veniam. Lorem pariatur elit ea duis.'
    //     },
    //     {
    //         id: 3,
    //         tabTitle: 'Tab 3',
    //         title: 'Title 3',
    //         content: 'Deserunt et elit elit ad dolor magna. Nisi amet consectetur Lorem eiusmod dolore adipisicing do reprehenderit. Voluptate consequat magna nostrud in officia labore. Minim excepteur consectetur quis nostrud nisi magna duis sunt sint qui. Fugiat ea reprehenderit eiusmod proident officia. Consequat labore qui velit Lorem consectetur incididunt ut nisi.'
    //     },
    //     {
    //         id: 4,
    //         tabTitle: 'Tab 4',
    //         title: 'Title 4',
    //         content: 'Minim in dolor do fugiat laborum duis labore consectetur. Amet ut sint ipsum dolor ad nostrud commodo sunt veniam enim aliquip nulla sint ullamco. Do cupidatat et quis laborum esse est commodo. Commodo sunt consectetur do consequat minim occaecat id magna ullamco consequat irure.'
    //     }
    // ];



    const fetchText = async (tab) => {
        const tabNumber = tab.split(' ')[1];
        const response = await fetch(`https://api.allorigins.win/raw?url=http://loripsum.net/api/10/short/${tabNumber}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.text();
    };
    

    function removeHtmlTags(input) {
        return input.replace(/<\/?[^>]+(>|$)/g, "");
    }


    const [selectedTab, setSelectedTab] = useState('Tab 1');

 
    const { data, isLoading, error } = useQuery(
      ['tabContent', selectedTab],
      () => fetchText(selectedTab),
      { cacheTime: 1000 * 60 * 10 } 
    );





    return (
        <div className='container'>
            {/* TODO Add tabs here */}


      <div className="tabs">
        {['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={selectedTab === tab ? { color: 'white', backgroundColor: '#094555' } : {}}
           
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching content</p>
        ) : (
          <div>
            <h2>{selectedTab}</h2>
            <p>{removeHtmlTags(data)}</p>
          </div>
        )}
      </div>
    </div>

    );
}

export default Tabs;

// src/pages/docs-list.tsx
import React from 'react';
import useGlobalData from '@docusaurus/useGlobalData';

export default function DocsList() {
    const globalData = useGlobalData();
    const myData = globalData['my-metadata-plugin'].default.docs as Array<{filePath: string, frontMatter: Object}>;

    console.log('Données dans le navigateur :', myData);

  return (
    <div>
        Coucou
        <ul>
            {
                myData.map(item => {
                    console.log(item);
                    
                    return <li>{item.filePath} - {JSON.stringify(item.frontMatter)}</li>
                })
            }
        </ul>
    </div>
  );
}


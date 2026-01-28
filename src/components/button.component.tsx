import { JSX } from "react";

export function ButtonComponent({title, onClick}: {title: string, onClick: () => void}): JSX.Element {
    return (
        <button
          onClick={onClick}
          className="button button--primary button--sm"
          style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#1389fd' }}
        >
          {title}
        </button>
    );
}
import { CheckboxControl } from "@wordpress/components";

const CategorySelector = ( { categories, selected, onChange } ) => {

    const renderCategoryTree = ( tree ) => (
        <ol>
            { tree.map( ( node ) => (
                <li key={ node[0].id }>
                    <span>
                        <CheckboxControl
                            label={ node[0].name }
                            checked={ selected.indexOf( node[0].id ) >= 0 }
                            onChange={ ( checked ) => {
                                const newSelected = selected.filter( ( categoryId ) => categoryId != node[0].id );
                                if ( checked ) {
                                    newSelected.push( node[0].id );
                                }
                                onChange( newSelected );
                            } }
                        />
                    </span>
                    { node[1].length > 0 && renderCategoryTree( node[1] ) }
                </li>
            ) ) }
        </ol>
    );

    return (
        <div className="revpress category-selector">
            { renderCategoryTree( categories.tree ) }
        </div>
    );
};

export default CategorySelector;
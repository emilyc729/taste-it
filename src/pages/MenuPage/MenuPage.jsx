import React, { Component } from 'react';
import './MenuPage.css';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar';
import Menu from '../../components/Menu/Menu';

class MenuPage extends Component {
    state = {
        categorySelected: ''
    }

    handleSelection = (category) => {
        console.log(category);
        this.setState({categorySelected: category});
    }
    
    render() {
        const menu = this.props.restaurant ? 
            <div className="row">
                <div className="col-md-2">
                    <MenuSidebar 
                        location={this.props.location} 
                        menus={this.props.restaurant.menus} 
                        categorySelected={this.state.categorySelected}
                        handleSelection={this.handleSelection}
                    />
                    
                </div>
                <div className="col-md-10">
                {this.props.restaurant.menus.map((menu, idx) => 
                    <div key={idx}>
                    <Menu
                        {...this.props} 
                        categories={menu.categories}
                        restaurant={this.props.restaurant}
                        customer={this.props.customer}
                        categorySelected={this.state.categorySelected}
                    />
                    </div>
                )}
                </div>
            </div>
            :
            <div>
                Loading...
            </div>
        return (
            <div className="MenuPage">
            {menu}
            </div>
        );
    }
};

export default MenuPage;
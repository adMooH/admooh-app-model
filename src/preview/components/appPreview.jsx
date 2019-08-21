import React from 'react';
export default class AppPreview extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const templateProps = {
			data: this.props.data,
			custom: this.props.custom,
			setApp: this.props.setApp,
			context: this.props.context
		};
		return this.props.getApp(templateProps);
	}
}
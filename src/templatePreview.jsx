import React from 'react';
export default class TemplatePreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			getTemplate: props.getTemplate,
			data: props.data
		};
		setInterval(() => {
			this.forceUpdate();
		}, 15000);
	}
	render() {
		const templateProps = {
			data: this.state.data
		};
		return this.state.getTemplate(templateProps);
	}
}
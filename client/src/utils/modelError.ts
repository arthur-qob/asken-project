export default class ModelError extends Error {
	constructor(txtDeErro: string) {
		super(txtDeErro)
		console.log(txtDeErro + '\n\n' + this.stack)
	}
}

import React from 'react';

export default class MedicalRecordUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''

    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    form.set('userId', this.props.userId);

    const req = {
      method: 'POST',
      body: form
    };

    fetch('/api/uploads/medicalRecord', req)
      .then(res => res.json())
      .then(result => {
        this.props.updateMedicalRecordOriginalName(result.originalName);
        event.target.reset();
      })
      .catch(err => console.error(err));

  }

  render() {
    const errorMessage = this.state.errorMessage;

    return (
      <>
      <MedicalRecord onSubmit={this.submitForm} errorMessage={errorMessage} />
      </>
    );
  }
}

function MedicalRecord(props) {
  const errorMessage = props.errorMessage;
  return (
     <form onSubmit={ props.onSubmit }>
        <div className="input-group col-5">
         <input type="file" name="image" className="form-control" />
         <button type="submit" className="btn btn-primary"> Upload</button>
        </div>
        <div className="help-block mt-2 ps-5"> {errorMessage}</div>
     </form>

  );
}

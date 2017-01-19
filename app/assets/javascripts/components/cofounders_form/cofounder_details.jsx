class CofoundersFormCofounderDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      useCollegeText: false
    };

    this.handleCollegeChange = this.handleCollegeChange.bind(this);
  }

  canDelete() {
    return !this.persisted();
  }

  componentDidMount() {
    let collegeSelect = $('#' + this.selectId());

    collegeSelect.select2({
      minimumInputLength: 3,
      placeholder: 'Please pick your college',
      ajax: {
        url: this.props.collegesUrl,
        dataType: 'json',
        delay: 500,
        data: function (params) {
          return {
            q: params.term
          }
        },
        processResults: function (data, params) {
          return {results: data}
        },
        cache: true
      }
    });

    collegeSelect.on('change', this.handleCollegeChange)
  }

  componentWillUnmount() {
    this.destroySelect2();
  }

  destroySelect2() {
    $(this.selectId()).select2('destroy');
  }

  selectId() {
    return "cofounders-form__college-select-" + this.props.index;
  }

  handleCollegeChange(event) {
    if (event.target.value === 'other') {
      this.destroySelect2();
      this.setState({useCollegeText: true});
    }
  }

  errorForField(field) {
    return this.props.cofounder.errors[field][0];
  }

  cofounderValue(field) {
    return this.props.cofounder.fields[field];
  }

  hasCollege() {
    return this.cofounderValue('college_id') !== null;
  }

  persisted() {
    return typeof(this.cofounderValue('id')) !== 'undefined';
  }

  deleteCheckboxId() {
    return "cofounders-form__cofounder-delete-checkbox-" + this.props.index;
  }

  render() {
    return (
      <div className="cofounder content-box">
        { this.canDelete() &&
        <div className="cofounder-delete-button">
          <i className="fa fa-times-circle"/>
        </div>
        }

        {this.persisted() &&
        <input className="hidden" type="hidden" value={ this.cofounderValue('id') }
          name={ "batch_applications_cofounders[cofounders_attributes][" + this.props.index + "][id]" }/>
        }

        <CofoundersFormCofounderInput label="Name" index={ this.props.index } key={ "name-" + this.props.index }
          maxLength={ 250 } name="name" type="string" value={ this.cofounderValue('name') }/>

        <CofoundersFormCofounderInput label="Email address" index={ this.props.index }
          key={ "email-" + this.props.index } maxLength={ 250 } name="email" type="email"
          error={ this.errorForField('email') } value={ this.cofounderValue('email') } disabled={ this.persisted() }/>

        <CofoundersFormCofounderInput label="Mobile phone number" index={ this.props.index }
          key={ "phone-" + this.props.index } maxLength={ 17 } name="phone" type="tel"
          pattern="\+?[0-9]{8,16}" value={ this.cofounderValue('phone') }/>

        { !this.state.useCollegeText &&
        <div className="form-group select required batch_applications_cofounders_cofounders_college_id">
          <label className="control-label select required"
            htmlFor="batch_applications_cofounders_cofounders_attributes_0_college_id">
            <abbr title="required">*</abbr> College
          </label>

          <select defaultValue={ this.cofounderValue('college_id') } className="form-control select required"
            required="required" aria-required="true" id={ this.selectId() }
            name="batch_applications_cofounders[cofounders_attributes][0][college_id]">
            <option value=""/>
            { this.hasCollege() &&
            <option value={ this.cofounderValue('college_id') }>{ this.props.collegeName }</option>
            }
            { !this.hasCollege() &&
            <option value="other">My college isn't listed</option>
            }
          </select>
        </div>
        }

        { this.state.useCollegeText &&
        <CofoundersFormCofounderInput label="Name of your college" index={ this.props.index } type="string"
          key={ "college-text-" + this.props.index } maxLength={ 250 }
          name="college_text" value={ this.cofounderValue('college_text') }/>
        }

        {this.persisted() &&
        <div className="form-group boolean optional">
          <div className="checkbox">
            <label className="boolean optional" htmlFor={ this.deleteCheckboxId() }>
              <input className="boolean optional" type="checkbox" defaultChecked={ false }
                name={ "batch_applications_cofounders[cofounders_attributes][" + this.props.index + "][delete]" }
                id={ this.deleteCheckboxId() }/>
              &nbsp;Delete this cofounder
            </label>
          </div>
        </div>
        }
      </div>
    );
  }
}

CofoundersFormCofounderDetails.propTypes = {
  cofounder: React.PropTypes.object,
  collegesUrl: React.PropTypes.string,
  index: React.PropTypes.number,
  collegeName: React.PropTypes.string
};

let str = React.string

let pageLinks = courseId => [
  School__PageHeader.makeLink(
    ~href={`/school/courses/${courseId}/students/new`},
    ~title="Manual",
    ~icon="fas fa-user",
    ~selected=true,
  ),
  School__PageHeader.makeLink(
    ~href=`/school/courses/${courseId}/students/import`,
    ~title="CSV File Import",
    ~icon="fas fa-file",
    ~selected=false,
  ),
]

@react.component
let make = (~courseId, ~search) => {
  <div role="main" className="flex-1 flex flex-col">
    <School__PageHeader
      exitUrl={`/school/courses/${courseId}/students`}
      title="Add new students"
      description={"You can add multiple students to a list and add them to course"}
      links={pageLinks(courseId)}
    />
    <div className="max-w-5xl mx-auto"> {str("Add student create form here!!")} </div>
  </div>
}

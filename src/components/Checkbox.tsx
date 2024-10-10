function Checkbox(props: any) {
  const { fnClick, fnChange, title = "", checked = false } = props;
  return (
    <label>
      <input
        style={{ width: 20, height: 20 }}
        onClick={(e: any) => {
          if (fnClick !== undefined) fnClick(e.target.checked);
        }}
        onChange={(e: any) => {
          if (fnChange !== undefined) fnChange(e.target.checked);
        }}
        type="checkbox"
        checked={checked}
      />
      {/* {" Checkbox " + title} */}
    </label>
  );
}

export default Checkbox;

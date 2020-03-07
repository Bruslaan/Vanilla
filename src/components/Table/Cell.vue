<script>
import TableText from "./Cell/table_text";
import TableCheckbox from "./Cell/table_checkbox";

export default {
  name: "Cell",
  props: {
    name: {
      type: String,
      required: true
    },
    component: {
      type: String,
      required: true
    }
  },
  render: function(createElement) {
    let self = this;
    if (
      this.component == "text" ||
      this.component == "number" ||
      this.component == "date"
    )
      return createElement(TableText, {
        props: {
          name: self.name
        }
      });
    else {
      return createElement(TableCheckbox, {
        props: {
          name: self.name
        }
      });
    }
  },
  components: {
    TableText,
    TableCheckbox
  }
};
</script>
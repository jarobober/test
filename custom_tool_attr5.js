unlayer.registerTool({
  name: "usercom_attr_clientuser",
  label: "User",
  icon: "fa-user",
  supportedDisplayModes: ["web"],
  options: {
    attrClientuser: {
      title: "User form",
      position: 1,
      options: {
        attrClientuser: {
          label: "Attributes user",
          defaultValue: "none",
          widget: "dropdown"
        },
        attrLabelName: {
          label: "Label",
          defaultValue: "Label",
          widget: "text"
        },
        attrPlaceholder: {
          label: "Placeholder",
          defaultValue: "Enter value placeholder",
          widget: "text"
        },
        attrRequired: {
          label: "Required",
          defaultValue: true,
          widget: "toggle"
        },
        inputBorderRadius: {
          label: "Border radius",
          defaultValue: "0",
          widget: "counter"
        },
        inputFontSize: {
          label: "Font size",
          defaultValue: "14",
          widget: "counter"
        },
        inputFontColor: {
          label: "Input font color",
          defaultValue: "#1B1B1B",
          widget: "color_picker"
        },
        labelFontColor: {
          label: "Label color",
          defaultValue: "#1B1B1B",
          widget: "color_picker"
        },
        submitFontFamily: {
          label: "Font style",
          defaultValue: {
            label: "Arial",
            value: "arial,helvetica,sans-serif"
          },
          widget: "font_family"
        }
      }
    }
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        let maxLength = null;
        const value = values.attrClientuser.split("&");
        const name_st = value[0];
        const type = value[1];
        if (value.length == 3) {
          maxLength = value[value.length - 1];
        }
        const fixedOptions = [];
        let fixedMulti = "";
        if (type == "fixed") {
          /*
            w bazie danych zapisane landingi mają split to znaku `&`, natomiast do fixed choice ktoś moze wrzucic do label lub value wlasnie taki znak
            przez co wartosci z atrybutow sie zle splituje. Takie rozwiazanie naprawia problem oraz utrzymuje w bazie juz stworzone przez klientow landingi.
            slice - dynamiczna wartosc jaka musimy wycicac z ciagu biorac pod uwage name i type + 2 -> dlatego, ze mamy 2 znaki &
            fixedMulti - sprawdza czy jest multi na koncu (Boolean)
          */
          fixedMulti = value[value.length - 2] == "multi";

          const slice = name_st.length + type.length + 2;
          let option = "";
          if (fixedMulti) {
            option = values.attrClientuser.slice(slice, -10);
          } else {
            option = values.attrClientuser.slice(slice, -4);
          }

          // value: "dadasdas_cf&fixed&1,1,1,1,2,2,2,2,3,3,3,3&255"
          const fixedOptionsArray = option.split("{|}");

          for (let i = 0; i < fixedOptionsArray.length; i++) {
            if (i !== 0 && i % 2 !== 0) {
              const element = {
                value: fixedOptionsArray[i],
                label: fixedOptionsArray[i - 1]
              };
              fixedOptions.push(element);
            }
          }
        }
        const styleWrapper = "padding-bottom: 10px";
        const styleLabel = `text-align: left; color: ${values.labelFontColor}; font-size: ${values.inputFontSize}px; padding: 0px 0px 3px;`;
        const styleInput = `border-width: 1px; border-style: solid; border-color: rgb(238, 238, 238); padding: 10px; color: ${
          values.inputFontColor
        }; background-color: rgb(255, 255, 255); font-size: ${
          values.inputFontSize
        }px; width: 100%; border-radius: ${
          values.inputBorderRadius
        }px; font-family: ${
          values.submitFontFamily
            ? values.submitFontFamily.value
            : "arial,helvetica,sans-serif"
        } !important;`;
        const styleBoolean = "";
        let label = "";
        if (value.attrLabelName !== "") {
          label = `<label for="${name_st}">${values.attrLabelName}</label>`;
        } else {
          label = `<label for="${name_st}"></label>`;
        }
        if (values.attrClientuser !== "none") {
          if (type == "string") {
            if (name_st == "email") {
              return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <input class="usercomFormLayout" type="email" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" maxlength="${maxLength}" required="${values.attrRequired}" style="${styleInput}">
                </div>
              </div>`;
            }
            return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <input class="usercomFormLayout" type="text" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" maxlength="${maxLength}" required="${values.attrRequired}" style="${styleInput}">
                </div>
              </div>`;
          }

          if (type == "integer") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="number" placeholder="${values.attrPlaceholder}" step="1" id="${name_st}" name="${name_st}" maxlength="${maxLength}" required="${values.attrRequired}" style="${styleInput}">
              </div>
            </div>`;
          }

          if (type == "floating") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="number" placeholder="${values.attrPlaceholder}" step="any" id="${name_st}" name="${name_st}" maxlength="${maxLength}" required="${values.attrRequired}"  style="${styleInput}">
              </div>
            </div>`;
          }

          if (type == "date") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="date" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" value="" maxlength="${maxLength}" required="${values.attrRequired}"   style="${styleInput}">
              </div>
            </div>`;
          }

          if (type == "datetime") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="datetime-local" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" maxlength="${maxLength}" required="${values.attrRequired}"   style="${styleInput}">
              </div>
            </div>`;
          }

          if (type === "boolean") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                <input class="usercomFormLayout" type="checkbox" id="${name_st}" name="${name_st}" maxlength="${maxLength}" required="${values.attrRequired}" style="${styleBoolean}">
                ${label}
              </div>
            </div>`;
          }

          if (type == "fixed") {
            let options = "";
            for (let i = 0; i < fixedOptions.length; i++) {
              options += `
                <option value="${fixedOptions[i].value}">${fixedOptions[i].label}</option>
              `;
            }
            if (fixedMulti) {
              return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <select class="usercomFormLayout" type="fixed-multiple" name="${name_st}" id="${name_st}" multiple maxlength="${maxLength}" required="${values.attrRequired}" style="${styleInput}">
                    <option value="" disabled selected>${values.attrPlaceholder}</option>
                    ${options}
                  </select>
                </div>
              </div>`;
            }
            return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <select class="usercomFormLayout" name="${name_st}" id="${name_st}" maxlength="${maxLength}" required="${values.attrRequired}" style="${styleInput}">
                    <option value="" disabled selected>${values.attrPlaceholder}</option>
                    ${options}
                  </select>
                </div>
              </div>`;
          }
        } else {
          return `<div>
            <p>Choose user attribute</p>
          </div>`;
        }
      }
    }),
    exporters: {
      web(values) {
        console.log("yyy", Object.keys(values));
        console.log("hideMobile", values.hideMobile);
        console.log("override", values._override);
        console.log("hideable", values.hideable);
        console.log("attrClientuser", values.attrClientuser);
        let maxLength = null;
        const value = values.attrClientuser.split("&");
        let hideDesktop = false;
        if (
          values.hasOwnProperty("_override") &&
          values._override.hasOwnProperty("desktop")
        ) {
          console.log('x desktop', values._override.desktop)
          hideDesktop = values._override.desktop.hideDesktop;
        }
        let hideMobile = false;
        if (
          values.hasOwnProperty("_override") &&
          values._override.hasOwnProperty("mobile")
        ) {
          console.log('x mobile', values._override.mobile)
          hideMobile = values._override.mobile.hideMobile;
        }
        const name_st = value[0];
        const type = value[1];
        if (value.length == 3) {
          maxLength = value[value.length - 1];
        }
        const fixedOptions = [];
        let fixedMulti = "";
        if (type == "fixed") {
          /*
            w bazie danych zapisane landingi mają split to znaku `&`, natomiast do fixed choice ktoś moze wrzucic do label lub value wlasnie taki znak
            przez co wartosci z atrybutow sie zle splituje. Takie rozwiazanie naprawia problem oraz utrzymuje w bazie juz stworzone przez klientow landingi.
            slice - dynamiczna wartosc jaka musimy wycicac z ciagu biorac pod uwage name i type + 2 -> dlatego, ze mamy 2 znaki &
            fixedMulti - sprawdza czy jest multi na koncu (Boolean)
          */
          fixedMulti = value[value.length - 2] == "multi";

          const slice = name_st.length + type.length + 2;
          let option = "";
          if (fixedMulti) {
            option = values.attrClientuser.slice(slice, -10);
          } else {
            option = values.attrClientuser.slice(slice, -4);
          }

          // value: "dadasdas_cf&fixed&1,1,1,1,2,2,2,2,3,3,3,3&255"
          const fixedOptionsArray = option.split("{|}");

          for (let i = 0; i < fixedOptionsArray.length; i++) {
            if (i !== 0 && i % 2 !== 0) {
              const element = {
                value: fixedOptionsArray[i],
                label: fixedOptionsArray[i - 1]
              };
              fixedOptions.push(element);
            }
          }
        }
        const styleWrapper = "padding-bottom: 10px";
        const styleLabel = `text-align: left; color: ${values.labelFontColor}; font-size: ${values.inputFontSize}px; padding: 0px 0px 3px;`;
        const styleInput = `border-width: 1px; border-style: solid; border-color: rgb(238, 238, 238); padding: 10px; color: ${
          values.inputFontColor
        }; background-color: rgb(255, 255, 255); font-size: ${
          values.inputFontSize
        }px; width: 100%; border-radius: ${
          values.inputBorderRadius
        }px; font-family: ${
          values.submitFontFamily
            ? values.submitFontFamily.value
            : "arial,helvetica,sans-serif"
        } !important;`;
        const styleBoolean = "";
        let label = "";
        if (value.attrLabelName !== "") {
          label = `<label for="${name_st}">${values.attrLabelName}</label>`;
        } else {
          label = `<label for="${name_st}"></label>`;
        }
        if (values.attrClientuser !== "none") {
          if (type == "string") {
            if (name_st == "email") {
              return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <input class="usercomFormLayout" type="email" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}" style="${styleInput}">
                </div>
              </div>`;
            }
            return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <input class="usercomFormLayout" type="text" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}" style="${styleInput}">
                </div>
              </div>`;
          }

          if (type == "integer") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="number" placeholder="${values.attrPlaceholder}" step="1" id="${name_st}" name="${name_st}" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}" style="${styleInput}">
              </div>
            </div>`;
          }

          if (type == "floating") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="number" placeholder="${values.attrPlaceholder}" step="any" id="${name_st}" name="${name_st}" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}"  style="${styleInput}">
              </div>
            </div>`;
          }

          if (type == "date") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="date" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" value="" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}"   style="${styleInput}">
              </div>
            </div>`;
          }

          if (type == "datetime") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                ${label}
              </div>
              <div>
                <input class="usercomFormLayout" type="datetime-local" placeholder="${values.attrPlaceholder}" id="${name_st}" name="${name_st}" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}"   style="${styleInput}">
              </div>
            </div>`;
          }

          if (type === "boolean") {
            return `<div style="${styleWrapper}">
              <div style="${styleLabel}">
                <input class="usercomFormLayout" type="checkbox" id="${name_st}" name="${name_st}" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}" style="${styleBoolean}">
                ${label}
              </div>
            </div>`;
          }

          if (type == "fixed") {
            let options = "";
            for (let i = 0; i < fixedOptions.length; i++) {
              options += `
                <option value="${fixedOptions[i].value}">${fixedOptions[i].label}</option>
              `;
            }
            if (fixedMulti) {
              return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <select class="usercomFormLayout usercom-multiselect" type="fixed-multiple" name="${name_st}" id="${name_st}" multiple maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}" style="${styleInput}">
                    <option value="" disabled selected>${values.attrPlaceholder}</option>
                    ${options}
                  </select>
                </div>
              </div>`;
            }
            return `<div style="${styleWrapper}">
                <div style="${styleLabel}">
                  ${label}
                </div>
                <div>
                  <select class="usercomFormLayout" name="${name_st}" id="${name_st}" maxlength="${maxLength}" data-hide-desktop="${hideDesktop}" data-hide-mobile="${hideMobile}" required="${values.attrRequired}" style="${styleInput}">
                    <option value="" disabled selected>${values.attrPlaceholder}</option>
                    ${options}
                  </select>
                </div>
              </div>`;
          }
        } else {
          return `<div>
            <p>Choose clientuser attribute</p>
          </div>`;
        }
      }
    },
    head: {
      css(values) {},
      js(values) {}
    }
  }
});

/*

### NOT SURE THIS WORKS...

  const toggleSwitch = document.querySelector('.theme-switch input');
    
    function switchTheme(e) {
        if(e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('data-theme', 'dark'); //add this
        }
        else{
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('data-theme', 'light'); //add this
        }
      }
    
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    const currentTheme = localStorage.getItem('data-theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
      
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
          }
        };
      
      /*var checkbox = document.querySelector(".theme-switch input[name=theme]");
      checkbox.addEventListener("change", function(){
        if(this.checked)
        {
          trans();
          document.documentElement.setAttribute("theme","dark");
        } else {
          trans();
          document.documentElement.setAttribute("theme","light");
        }
      });
      
      let trans = () => {
        document.documentElement.classList.add("transition");
        window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
        }, 1000);
      };
*/
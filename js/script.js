<script type="text/javascript">
        async function handleFormSubmission(event){
            event.preventDefault();

            const form = document.getElementById("applicationForm");
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

           // Convert image to Base64    
            const image_fileContent = await new Promise((resolve, reject) =>{
               const file = formData.get("image");
               const reader = new FileReader();
               reader.onload = () => resolve(reader.result); // full data URL
               reader.onerror = reject;
               reader.readAsDataURL(file);
      });
                  
        

        console.log(image_fileContent);


            const formattedData = {
                name : data.name,
                adult : data.adult,
                highSchool : data.highSchool,
                primarySchool : data.primarySchool,
                toddler : data.toddler,
                emailAddress : data.emailAddress,
                image : {
                    fileName : data.image.name,
                    fileType : data.image.type,
                    fileContent : image_fileContent
                }                
            };

            
            fetch("https://default362a4d9a4ee448f192595cb3b51294.18.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ef5cf03a4f3042c9a0b3a1f393455eba/triggers/manual/paths/invoke/?api-version=1&tenantId=tId&environmentName=Default-362a4d9a-4ee4-48f1-9259-5cb3b5129418&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VsP3mfj5aKgMvF2A_OyL1MU_qaFPoevnFt-SqAW5CIk",
                {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(formattedData)
                }); 

        // Optional: send imageBase64 to Power Automate here...

        // Show confirmation + preview
                const root = document.getElementById("root");
                root.innerHTML = `
                <div class="text-center">
              <h2 class="mb-3">🎉 Thank you for your submission!</h2>
              <p>Here's a preview of your uploaded image:</p>
              <img src="${imageBase64}" alt="Uploaded Image" style="max-width: 300px; border-radius: 10px;" />
              <br/>
              <button onclick="window.location.reload()" class="btn btn-secondary mt-3">Submit another response</button>
            </div>
          `;
        }
                   
        window.onload = () => {
            const form = document.getElementById("applicationForm");
            form.addEventListener("submit", handleFormSubmission); 
        }    
</script>

//Handler
{
				request: "crt.HandleViewModelAttributeChangeRequest",
				handler: async (request, next) => {
					const startDate = await request.$context.PDS_UsrStartDate_3evyk62;
					const endDate = await request.$context.PDS_UsrEndDate_4o52xa2;
					if (request.attributeName === "PDS_UsrStartDate_3evyk62" || request.attributeName === "PDS_UsrEndDate_4o52xa2") {
						if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
							// Clear invalid end date
							request.$context.PDS_UsrEndDate_4o52xa2 = null;
							// Show warning popup
							request.$context.executeRequest({
								    type: "crt.ShowDialogRequest",
								    $context: request.$context,
								    dialogConfig: {
								        data: {
								            message: "End date cannot be earlier than start date.",
								            actions: [{
								                key: "OK",
								                config: {
								                    color: "primary",
								                    caption: "OK"
								                }
								            }]
								        }
								    }
								});
						}
					}
					return next?.handle(request);
				}
			}

import Html from "@kitajs/html";

type ModalProps = {
  activator: JSX.Element;
  isModalOpenVariableName?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onConfirm?: string;
} & Html.PropsWithChildren;

export default function Modal({
  activator,
  children,
  isModalOpenVariableName = "isModalOpen",
  className,
  size = "md",
  onConfirm,
  ...props
}: ModalProps) {
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
  };

  return (
    <div
      x-data={`{
        ${isModalOpenVariableName}: false,
        closeModal(confirmed = false) {
          this.${isModalOpenVariableName} = false;
          ${onConfirm ? `if (confirmed) { ${onConfirm} }` : ""}
        }
      }`}
      {...{
        "x-on:keydown.escape.window": "closeModal()",
        "x-on:close-modal.window": `if (${isModalOpenVariableName}) closeModal()`,
      }}
      {...props}
    >
      <div x-on:click={`${isModalOpenVariableName} = true`}>{activator}</div>

      <div
        x-show={isModalOpenVariableName}
        x-cloak="true"
        class={`relative z-100 ${className || ""}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          x-on:click="closeModal()"
        />
        <div class="fixed inset-0 z-100 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              class={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} sm:p-6`}
              {...{ "x-on:click.away": "closeModal()" }}
            >
              <div class="max-h-[80vh] overflow-y-auto">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

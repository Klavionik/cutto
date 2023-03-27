from django import forms


class LinkPasswordForm(forms.Form):
    password = forms.CharField(max_length=12, required=True)

    def __init__(self, *args, link, **kwargs):
        super().__init__(*args, **kwargs)
        self._link = link

    def clean_password(self):
        password = self.cleaned_data["password"]

        if password != self._link.password:
            raise forms.ValidationError("Password doesn't match.")
        return password

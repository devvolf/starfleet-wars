import { FailureSnackbarComponent } from '../components/snackbars/failure-snackbar/failure-snackbar.component';
import { InfoSnackbarComponent } from '../components/snackbars/info-snackbar/info-snackbar.component';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let snackbar: any;
  let service: SnackbarService;

  beforeEach(() => {
    snackbar = {
      openFromComponent: jest.fn(),
    };
    service = new SnackbarService(snackbar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fail() open failure snackbar with default message', () => {
    // Arrange
    const message = 'Something went wrong';

    // Act
    service.fail();

    // Assert
    expect(snackbar.openFromComponent).toBeCalledTimes(1);
    expect(snackbar.openFromComponent).toHaveBeenCalledWith(
      FailureSnackbarComponent,
      { data: { message } }
    );
  });

  it('should fail() open failure snackbar with custom message', () => {
    // Arrange
    const message = 'Test fail message';

    // Act
    service.fail(message);

    // Assert
    expect(snackbar.openFromComponent).toBeCalledTimes(1);
    expect(snackbar.openFromComponent).toHaveBeenCalledWith(
      FailureSnackbarComponent,
      { data: { message } }
    );
  });

  it('should info() open info snackbar with passed message', () => {
    // Arrange
    const message = 'Test info message';

    // Act
    service.info(message);

    // Assert
    expect(snackbar.openFromComponent).toBeCalledTimes(1);
    expect(snackbar.openFromComponent).toHaveBeenCalledWith(
      InfoSnackbarComponent,
      {
        data: {
          message,
        },
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  });
});

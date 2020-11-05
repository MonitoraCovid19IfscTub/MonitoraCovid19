import IProfileRepository from '../repositories/IProfileRepository';
import ProfileRepository from '../infra/typeorm/repositories/ProfileRepository';

export default class VerifyProfileExist {
  private profileRepository: IProfileRepository;

  private profileId: string;

  constructor(profileId: string) {
    this.profileRepository = new ProfileRepository();
    this.profileId = profileId;
  }

  async run(): Promise<boolean> {
    const profile = await this.profileRepository.findProfileAndTypeProfileById(
      this.profileId,
    );

    if (!profile) {
      return false;
    }

    return !!profile.id;
  }
}
